document.addEventListener('DOMContentLoaded', function() {
    async function fetchData() {
        try {
            const response = await fetch('data.json');
            return await response.json();
        } catch (error) {
            console.error('Error fetching the data:', error);
        }
    }

    window.checkLeak = async function() {
        const userInput = document.getElementById('userInput').value.trim().toLowerCase();
        const data = await fetchData();

        if (data) {
            const leakedData = data.find(entry => entry.usuario.toLowerCase() === userInput);

            const resultDiv = document.getElementById('result');
            if (leakedData) {
                resultDiv.innerHTML = `
                    <p>Username: ${leakedData.usuario}</p>
                    <p>Password: ${leakedData.senha}</p>
                    <p>Confirm Password: ${leakedData.confirmar}</p>
                    <p>IP: ${leakedData.ip}</p>
                `;
                alert('Your data was leaked! Please take safety measures.');
            } else {
                resultDiv.textContent = 'Congratulations, this was not leaked data.';
            }
        } else {
            console.error('No data available.');
        }
    }
});