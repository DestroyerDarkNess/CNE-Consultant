export const API_HOST =
  "https://appgoooooobgob.000webhostapp.com/CNE.gob/API/Get_dni.php";

export const Counter = `
<div class="d-flex justify-content-center h-100">
<iframe id="CounterEx" width="300" height="154" src="https://w2.countingdownto.com/5593135" frameborder="0"></iframe>
</div>
`;

export const CardData = `
<div id="CardInfo" class="card mb-3" style="max-width: 540px" data-bs-theme="dark">
             <iframe id="bandera" height="80px" src="Flag_of_Venezuela_H.html"></iframe>
            <div class="card-body">
            
              <h5 class="card-title" id="PersonName">Titulo</h5>
              <hr />

<div
                class="alert alert-dark d-flex justify-content-between align-items-center"
                role="alert"
              >
                <span>API / Response</span>
                <a
                  class="btn btn-primary"
                  data-bs-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <i class="fas fa-caret-down"></i>
                </a>
              </div>

              <div class="collapse" id="collapseExample">
                <div class="card card-body">
                  <input
                    id="post_url"
                    type="text"
                    class="form-control mt-3"
                    placeholder="Enter URL"
                    value=""
                    disabled
                  />
                  <pre
                    class="json-code"
                  ><code id="code-container" class="json">{
    "name": "John Doe",
    "age": 30,
    "city": "New York"
}</code></pre>
                </div>
                <hr />
              </div>

              <form class="form-floating">
                <input
                  type="email"
                  class="form-control"
                  id="DNI_Input"
                  placeholder="Cedula"
                  value=""
                  disabled
                />
                <label for="floatingInputValue">Cedula</label>
              </form>

              <div
                class="btn-group"
                role="group"
                aria-label="Button group with nested dropdown"
              >
                <div class="btn-group" role="group">
                  <button
                    type="button"
                    class="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Export
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" id="ToImage">To Image</a></li>
                    <li><a class="dropdown-item" id="ToPDF">To PDF</a></li>
                  </ul>
                </div>
              </div>

              <div class="iframe-container position-relative">
                <div class="btn-group">
                  <button
                    class="btn btn-secondary btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Adress
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" id="Votacion">
                        Centro de Votacion
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" id="Domicilio">
                        Zona residencial
                      </a>
                    </li>
                  </ul>
                </div>

                <iframe
                  id="IframeMap"
                  width="100%"
                  height="600"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                  src=""
                >
                </iframe>
              </div>

              <p class="card-text">
                <small class="text-body-secondary" id="text-adress">
                  Last updated 3 mins ago
                </small>
              </p>
            </div>
          </div>
`;
