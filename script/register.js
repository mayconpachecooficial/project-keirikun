document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('loader').style.display = 'block';

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const language = document.getElementById('language').value;

    const data = {
        username: username,
        password: password,
        email: email,
        isActive: true,
        language: language
    };

    fetch('http://localhost:3000/noauth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'insomnia/9.3.1'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('loader').style.display = 'none';
        if (data.error && data.error === 'User already exists') {
            showModal('Usuário já cadastrado em nosso banco de dados.');
        } else {
            showModal('Cadastro realizado com sucesso!', true);
        }
    })
    .catch((error) => {
        document.getElementById('loader').style.display = 'none';
        showModal('Ocorreu um erro ao realizar o cadastro.');
        console.error('Error:', error);
    });
});

function showModal(text, success = false) {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    document.getElementById("modalText").innerText = text;
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
        if (success) {
            window.location.href = '../views/loginadminrst.html';
        }
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            if (success) {
                window.location.href = '../views/loginadminrst.html';
            }
        }
    }
}