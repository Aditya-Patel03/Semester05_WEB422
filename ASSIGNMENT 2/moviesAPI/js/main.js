var page = 1
var perPage = 10
var url = 'https://nice-pear-lamb-cuff.cyclic.app/'

const loadMovieData = (title = null) => {
    if (title != null) {
        fetch(url + `api/movies?page=${page}&perPage=${perPage}&title=${title}`)
            .then((res) => { return res.json() })
            .then((data) => {
                var page = document.querySelector('.pagination')
                page.classList.add("d-none")
                addTrToTable(data)
                updateCurrentPage()
                addClickToRow()
                previousPage()
                nextPage()
                searchBt()
                clearBt()
            })
    }

    else {
        fetch(url + `api/movies?page=${page}&perPage=${perPage}`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                addTrToTable(data)
                updateCurrentPage()
                addClickToRow()
                previousPage()
                nextPage()
                searchBt()
                clearBt()
            })

    }
}
document.addEventListener('DOMContentLoaded', function () {
    loadMovieData()
});



const createTrElement = (data) => {
    let trElement =
        `${data.map(a => (
            `
        <tr data-id=${a._id}>
            <td>${a.year}</td>
            <td>${a.title}</td>
            <td>${a.plot}</td>
            <td>${a.rated ? a.rated : "N/A"}</td>
            <td>${Math.floor(a.runtime / 60)}:${(a.runtime % 60).toString().padStart(2, '0')}</td>
        </tr>
        `
        )).join('')}`

    return trElement
}

const addTrToTable = (data) => {

    let trElement = createTrElement(data)
    let tableBody = document.querySelector('#moviesTable tbody')
    tableBody.innerHTML = trElement

}

const updateCurrentPage = () => {
    document.querySelector('#current-page').innerHTML = page

}

const addClickToRow = () => {
    let dataRows = document.querySelectorAll('tbody tr')
    dataRows.forEach(row => {
        row.addEventListener("click", () => {
            let id = row.getAttribute('data-id')
            fetch(url + `/api/movies/${id}`)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    document.querySelector('.modal-title').innerHTML = data.title
                    if (data.poster) {
                        document.querySelector('.modal-body').innerHTML =
                            `
                        <img class="img-fluid w-100" src= ${data.poster}><br><br>
                        <strong>Directed By:</strong> ${data.directors.join(',')}<br><br>
                        <p>${data.fullplot}</p>
                        <strong>Cast:</strong> ${data.cast ? data.cast.join(',') : "N/A"}<br><br>
                        <strong>Awards:</strong> ${data.awards.text}<br>
                        <strong>IMDB Rating:</strong> ${data.imdb.rating} (${data.imdb.votes} votes)
                        `
                    }
                    else {
                        document.querySelector('.modal-body').innerHTML =
                            `
                        <strong>Directed By:</strong> ${data.directors.join(',')}<br><br>
                        <p>${data.fullplot}</p>
                        <strong>Cast:</strong> ${data.cast ? data.cast.join(',') : "N/A"}<br><br>
                        <strong>Awards:</strong> ${data.awards.text}<br>
                        <strong>IMDB Rating:</strong> ${data.imdb.rating} (${data.imdb.votes} votes)
                        `
                    }

                    let modal = new bootstrap.Modal(document.getElementById('detailsModal'), {
                        backdrop: 'static',
                        keyboard: false,
                    });

                    modal.show();

                    // row.setAttribute("data-bs-toggle", "modal")
                    // row.setAttribute("data-bs-target", "#detailsModal")

                })
        })
    })
}

const previousPage = () => {
    let bt = document.querySelector('#previous-page')
    bt.addEventListener('click', () => {
        if (page > 1)
            page--
        loadMovieData()
    })
}

const nextPage = () => {
    let bt = document.querySelector('#next-page')
    bt.addEventListener('click', () => {
        page++
        loadMovieData()
    })
}

const searchBt = () => {
    document.querySelector('#searchForm').addEventListener('submit', (event) => {
        event.preventDefault();
        loadMovieData(document.querySelector('#title').value);
    });
}

const clearBt = () => {
    document.querySelector('#clear').addEventListener("click", () => {
        document.querySelector('#title').value = ''
        loadMovieData()
    })
}
