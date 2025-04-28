document.addEventListener('DOMContentLoaded', function() {
    const rentalsData = [
        {
            id: 1,
            livro: "Harry Potter e a Pedra Filosofal",
            leitor: "Ana",
            cpf: "30834974827",
            data: "23/04/2025",
            previsao: "24/04/2025",
            devolucao: "24/04/2025"
        },
        {
            id: 2,
            livro: "Harry Potter e a Pedra Filosofal",
            leitor: "Marcelo",
            cpf: "30834974800",
            data: "23/04/2025",
            previsao: "27/04/2025",
            devolucao: "24/04/2025"
        },
        {
            id: 3,
            livro: "O Pequeno Príncipe",
            leitor: "Arnaldo",
            cpf: "308349748141",
            data: "21/04/2025",
            previsao: "25/04/2025",
            devolucao: null
        },
        {
            id: 4,
            livro: "1984",
            leitor: "Ana",
            cpf: "30834974827",
            data: "23/04/2025",
            previsao: "24/04/2025",
            devolucao: null
        }
    ];

    const rentalsTable = document.getElementById('rentalsTable').getElementsByTagName('tbody')[0];

    // Render rentals
    function renderRentals() {
        rentalsTable.innerHTML = '';
        rentalsData.forEach(rental => {
            const row = document.createElement('tr');
            
            // Format devolution cell
            const devolucaoCell = rental.devolucao ? 
                document.createTextNode(rental.devolucao) : 
                createReturnButton(rental.id);
            
            row.innerHTML = `
                <td>${rental.id}</td>
                <td>${rental.livro}</td>
                <td>${rental.leitor}</td>
                <td>${rental.cpf}</td>
                <td>${rental.data}</td>
                <td>${rental.previsao}</td>
                <td></td>
                <td>${createDeleteButton(rental.id).outerHTML}</td>
            `;
            
            // Add the devolution button or text to the cell
            const devolucaoTd = row.cells[6];
            devolucaoTd.appendChild(devolucaoCell);
            
            rentalsTable.appendChild(row);
        });

        // Add event listeners to return buttons
        document.querySelectorAll('.return-btn').forEach(button => {
            button.addEventListener('click', function() {
                const rentalId = parseInt(this.getAttribute('data-id'));
                returnRental(rentalId);
            });
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const rentalId = parseInt(this.getAttribute('data-id'));
                deleteRental(rentalId);
            });
        });
    }

    // Create return button
    function createReturnButton(id) {
        const button = document.createElement('button');
        button.textContent = 'Devolver';
        button.className = 'return-btn';
        button.setAttribute('data-id', id);
        return button;
    }

    // Create delete button
    function createDeleteButton(id) {
        const button = document.createElement('button');
        button.textContent = 'Excluir';
        button.className = 'delete-btn';
        button.setAttribute('data-id', id);
        return button;
    }

    // Return rental
    function returnRental(rentalId) {
        const rental = rentalsData.find(r => r.id === rentalId);
        if (rental) {
            rental.devolucao = new Date().toLocaleDateString('pt-BR');
            renderRentals();
            alert('Livro devolvido com sucesso!');
        }
    }

    // Delete rental
    function deleteRental(rentalId) {
        if (confirm('Tem certeza que deseja excluir esta locação?')) {
            const index = rentalsData.findIndex(r => r.id === rentalId);
            if (index !== -1) {
                rentalsData.splice(index, 1);
                renderRentals();
                alert('Locação excluída com sucesso!');
            }
        }
    }

    // Initial render
    renderRentals();
});