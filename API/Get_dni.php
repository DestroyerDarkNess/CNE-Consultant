<?php
// Activar reportes de errores excepto E_NOTICE
error_reporting(E_ALL & ~E_NOTICE);

header("Content-Type: application/json; charset=UTF-8");

if (isset($_GET['typeDni']) && isset($_GET['searchInput'])) {

    $typeDni = $_GET['typeDni'];
    $searchInput = $_GET['searchInput'];

    $url = "http://www.cne.gob.ve/web/registro_electoral/ce.php?nacionalidad=$typeDni&cedula=$searchInput";

    $options = [
        "http" => [
            "header" => "User-Agent: PHP\r\n"
        ]
    ];

    $context = stream_context_create($options);
    $html = file_get_contents($url, false, $context);

    if ($html !== false) {
        // Asegúrate de que el HTML se está cargando correctamente
        $doc = new DOMDocument('1.0', 'UTF-8');

        // Cargar el HTML y suprimir errores y advertencias
        @$doc->loadHTML('<?xml encoding="UTF-8">' . $html);

        // Crear un nuevo DOMXPath
        $xpath = new DOMXPath($doc);

        $fields = [
            'name' => 'Nombre:',
            'dni' => 'Cédula:',
            'state' => 'Estado:',
            'municipality' => 'Municipio:',
            'parish' => 'Parroquia:',
            'center' => 'Centro:',
            'address' => 'Dirección:'
        ];

        // Extract data using XPath
        $data = [];

        foreach ($fields as $key => $field) {
            $node = $xpath->query("//td[b/font[contains(text(), '$field')]]/following-sibling::td")->item(0);
            $data[$key] = $node ? trim($node->nodeValue) : null;
        }

        // Verificar si todos los campos están vacíos utilizando array_filter
        $allFieldsEmpty = !array_filter($data, function ($value) {
            return !empty($value);
        });

        // Crear la respuesta basada en la verificación anterior
        if ($allFieldsEmpty) {
            $response = [
                "status" => "error",
                "data" => "Usuario no registrado en el CNE"
            ];
        } else {
            $response = [
                "status" => "success",
                "data" => $data
            ];
        }

        echo json_encode($response, JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to retrieve data"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid parameters"]);
}

?>