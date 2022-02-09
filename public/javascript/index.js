const charactersAPI = new APIHandler("http://localhost:8000");

window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", function (event) {
      charactersAPI
        .getFullList()
        .then((response) => {
          console.log(response.data);

          let text = "";

          response.data
            .reverse()
            .forEach(
              (eachCharacter) =>
                (text += `<div class="character-info"><strong>${eachCharacter.name} (${eachCharacter.id})</strong><br>Profesión: ${eachCharacter.occupation}<br>Arma:${eachCharacter.weapon}</li></div>`)
            );
          document.querySelector(".characters-container").innerHTML = text;
        })
        .catch((err) => console.log(err));
    });

  document
    .getElementById("fetch-one")
    .addEventListener("click", function (event) {
      let id = document.querySelector("#miau").value;
      console.log(id);
      charactersAPI
        .getOneRegister(id)

        .then((response) => {
          console.log(response.data);
          const inputs = document.querySelectorAll(
            "#edit-character-form input"
          );
          inputs[0].value = response.data.id;
          inputs[1].value = response.data.name;
          inputs[2].value = response.data.occupation;
          inputs[3].value = response.data.weapon;
        })
        .catch((err) => console.log(err));
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", function (event) {
      const input = document.querySelector("#character-id-delete").value;
      charactersAPI
        .deleteOneRegister(input)
        .then(() => {
          document.querySelector("#delete-one").style.backgroundColor = "green";
        })
        .catch((err) => {
          document.querySelector("#delete-one").style.backgroundColor = "red";
          console.log(err);
        });
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      //para que no se recarge la página al ser tipo post
      const inputs = document.querySelectorAll("#edit-character-form input");
      const inputId = inputs[0].value;

      const characterData = {
        name: inputs[1].value,
        occupation: inputs[2].value,
        weapon: inputs[3].value,
        cartoon: inputs[4].checked,
      };
      console.log(characterData, inputId);
      charactersAPI
        .updateOneRegister(inputId, characterData)
        .then(() => {
          document.querySelector("#edit-data").style.backgroundColor = "green";
        })
        .catch((err) => {
          document.querySelector("#edit-data").style.backgroundColor = "red";
          console.log(err);
        });
    });

  document
    .getElementById("new-character-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const inputs = document.querySelectorAll("#new-character-form input");

      const characterData = {
        name: inputs[0].value,
        occupation: inputs[1].value,
        weapon: inputs[2].value,
      };

      charactersAPI
        .createOneRegister(characterData)
        .then(() => {
          document.querySelector("#send-data").style.backgroundColor = "green";
        })
        .catch((err) => {
          document.querySelector("#send-data").style.backgroundColor = "red";
          console.log(err);
        });
    });
});
