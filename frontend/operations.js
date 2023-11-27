function mostraLista() {
    fetch('https://node-test-d5r5.onrender.com/api/v1/dati', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Origin': '*',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore nella richiesta: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            var tableBody = document.getElementById("table").getElementsByTagName('tbody')[0];

            for (var i = 0; i < data.length; i++) {
                var row = tableBody.insertRow(i);

                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);

                cell1.innerHTML = data[i].etichette_brand;
                cell2.innerHTML = data[i].etichette_ordine;
                cell3.innerHTML = data[i].etichette_ordine_data;
                cell4.innerHTML = data[i].etichette_nome;
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                cell5.appendChild(checkbox);
            }

        })
        .catch(error => console.error('Errore nella richiesta:', error));
}
function filtraTabella() {
    var filtroBrand = document.getElementById("filtroBrand").value.toLowerCase();
    var filtroData = document.getElementById("filtroData").value;

    var table = document.getElementById("table");
    var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    for (var i = 0; i < rows.length; i++) {
        var brand = rows[i].getElementsByTagName('td')[0].innerHTML.toLowerCase();
        var data = rows[i].getElementsByTagName('td')[2].innerHTML;

        if (brand.includes(filtroBrand) && (filtroData === '' || data === filtroData)) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}
function esporta() {
    var table = document.getElementById("table");
    var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    var csvContent = "data:text/csv;charset=utf-8,";

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var row = [];

        for (var j = 0; j < cells.length - 1; j++) {
            row.push(cells[j].innerText);
        }

        csvContent += row.join(",") + "\n";
    }

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);

    link.click();
}