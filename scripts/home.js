document.addEventListener('DOMContentLoaded', function() {
    const booksData = [
        {
            "id": 1,
            "titulo": "Dom Quixote",
            "autor": "Miguel de Cervantes",
            "ano": 1605,
            "editora": "Editora Clássicos",
            "genero": "Romance",
            "descricao": "Um romance satírico sobre um fidalgo que acredita ser um cavaleiro andante.",
            "imagem": "https://m.media-amazon.com/images/I/91VokXkn8hL._AC_UF1000,1000_QL80_.jpg"
        },
        {
            "id": 2,
            "titulo": "1984",
            "autor": "George Orwell",
            "ano": 1949,
            "editora": "Companhia das Letras",
            "genero": "Distopia",
            "descricao": "Um retrato sombrio de um futuro totalitário.",
            "imagem": "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg"
        },
        {
            "id": 3,
            "titulo": "A Revolução dos Bichos",
            "autor": "George Orwell",
            "ano": 1945,
            "editora": "Editora B",
            "genero": "Fábula política",
            "descricao": "Uma alegoria sobre o totalitarismo disfarçado de fábula animal.",
            "imagem": "https://m.media-amazon.com/images/I/91BsZhxCRjL._AC_UF1000,1000_QL80_.jpg"
        },
        {
            "id": 4,
            "titulo": "O Pequeno Príncipe",
            "autor": "Antoine de Saint-Exupéry",
            "ano": 1943,
            "editora": "Agir",
            "genero": "Infantil/Filosófico",
            "descricao": "Um conto filosófico com críticas sociais sutis.",
            "imagem": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_gfqCPRhxsd3rPDM4-n3FP1oRyw3llRh53A&s"
        },
        {
            "id": 5,
            "titulo": "Orgulho e Preconceito",
            "autor": "Jane Austen",
            "ano": 1813,
            "editora": "Penguin",
            "genero": "Romance",
            "descricao": "A história de Elizabeth Bennet enquanto lida com questões de classe e amor.",
            "imagem": "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg"
        },
        {
            "id": 6,
            "titulo": "O Hobbit",
            "autor": "J.R.R. Tolkien",
            "ano": 1937,
            "editora": "HarperCollins",
            "genero": "Fantasia",
            "descricao": "A jornada de Bilbo Bolseiro em uma aventura pela Terra Média.",
            "imagem": "https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg"
        },
        {
            "id": 7,
            "titulo": "Moby Dick",
            "autor": "Herman Melville",
            "ano": 1851,
            "editora": "Nova Fronteira",
            "genero": "Aventura",
            "descricao": "A obsessiva caçada do capitão Ahab pela baleia branca.",
            "imagem": "https://m.media-amazon.com/images/I/91C5S-RQeeL._AC_UF1000,1000_QL80_.jpg"
        },
        {
            "id": 8,
            "titulo": "A Metamorfose",
            "autor": "Franz Kafka",
            "ano": 1915,
            "editora": "L&PM",
            "genero": "Ficção filosófica",
            "descricao": "Um homem acorda transformado em um inseto gigante.",
            "imagem": "https://m.media-amazon.com/images/I/71eJk7GtUOL._AC_UF1000,1000_QL80_.jpg"
        },
        {
            "id": 9,
            "titulo": "Grande Sertão: Veredas",
            "autor": "João Guimarães Rosa",
            "ano": 1956,
            "editora": "Nova Aguilar",
            "genero": "Romance",
            "descricao": "Um clássico da literatura brasileira sobre o sertão e seus conflitos.",
            "imagem": "https://m.media-amazon.com/images/I/81NtboFZziL._AC_UF1000,1000_QL80_.jpg"
        },
        {
            "id": 10,
            "titulo": "Harry Potter e a Pedra Filosofal",
            "autor": "J.K. Rowling",
            "ano": 1997,
            "editora": "Rocco",
            "genero": "Fantasia",
            "descricao": "O começo da jornada de um jovem bruxo em Hogwarts.",
            "imagem": "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg"
        }
    ];

    const booksGrid = document.getElementById('booksGrid');
    const searchInput = document.getElementById('searchInput');
    const bookModal = document.getElementById('bookModal');
    const rentModal = document.getElementById('rentModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const rentButton = document.getElementById('rentButton');
    const rentForm = document.getElementById('rentForm');
    const bookTitleInput = document.getElementById('bookTitle');
    const closeButtons = document.getElementsByClassName('close');
    const rentalsButton = document.getElementById('rentalsButton');

    let currentBookId = null;
    let rentalsData = JSON.parse(localStorage.getItem('rentals')) || [];

  
    function renderBooks(books) {
        booksGrid.innerHTML = '';
        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
                <img src="${book.imagem}" alt="${book.titulo}" class="book-cover">
                <h3>${book.titulo}</h3>
                <p>${book.autor}</p>
                <p>${book.ano}</p>
                <button class="details-btn" data-id="${book.id}">Detalhes</button>
            `;
            booksGrid.appendChild(bookCard);
        });

        
        document.querySelectorAll('.details-btn').forEach(button => {
            button.addEventListener('click', function() {
                const bookId = parseInt(this.getAttribute('data-id'));
                showBookDetails(bookId);
            });
        });
    }

    
    function showBookDetails(bookId) {
        const book = booksData.find(b => b.id === bookId);
        if (book) {
            currentBookId = bookId;
            modalTitle.textContent = book.titulo;
            modalContent.innerHTML = `
                <img src="${book.imagem}" alt="${book.titulo}" class="modal-cover">
                <p><strong>Autor:</strong> ${book.autor}</p>
                <p><strong>Ano:</strong> ${book.ano}</p>
                <p><strong>Editora:</strong> ${book.editora}</p>
                <p><strong>Gênero:</strong> ${book.genero}</p>
                <p><strong>Descrição:</strong> ${book.descricao}</p>
            `;
            bookModal.style.display = 'block';
        }
    }

   
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredBooks = booksData.filter(book => 
            book.titulo.toLowerCase().includes(searchTerm) || 
            book.autor.toLowerCase().includes(searchTerm)
        );
        renderBooks(filteredBooks);
    });

   
    rentButton.addEventListener('click', function() {
        const book = booksData.find(b => b.id === currentBookId);
        if (book) {
            bookTitleInput.value = book.titulo;
            bookModal.style.display = 'none';
            rentModal.style.display = 'block';
            
           
            const today = new Date();
            const returnDate = new Date();
            returnDate.setDate(today.getDate() + 7);
            
            document.getElementById('withdrawalDate').valueAsDate = today;
            document.getElementById('returnDate').valueAsDate = returnDate;
        }
    });

    rentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const rental = {
            bookId: currentBookId,
            bookTitle: bookTitleInput.value,
            readerName: document.getElementById('readerName').value,
            readerCPF: document.getElementById('readerCPF').value,
            withdrawalDate: document.getElementById('withdrawalDate').value,
            returnDate: document.getElementById('returnDate').value,
            rentalDate: new Date().toISOString()
        };
        
        rentalsData.push(rental);
        localStorage.setItem('rentals', JSON.stringify(rentalsData));
        
        alert('Locação registrada com sucesso!');
        rentModal.style.display = 'none';
        rentForm.reset();
    });

    
    rentalsButton.addEventListener('click', function() {
        window.location.href = 'locacoes.html';
    });

  
    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', function() {
            bookModal.style.display = 'none';
            rentModal.style.display = 'none';
        });
    }

    
    window.addEventListener('click', function(event) {
        if (event.target === bookModal) {
            bookModal.style.display = 'none';
        }
        if (event.target === rentModal) {
            rentModal.style.display = 'none';
        }
    });

   
    renderBooks(booksData);
});