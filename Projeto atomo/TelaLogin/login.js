 function entrar() {
            const user = document.getElementById("usuario").value;
            const pass = document.getElementById("senha").value;
            const erro = document.getElementById("erro");
            const loading = document.getElementById("loading");

            erro.innerText = "";

            if (user === "admin" && pass === "123456") {
                loading.style.display = "block";
                
                setTimeout(function() {
                    window.location.href = "../app.html";
                }, 1500);

            } else {
                erro.style.color = "#ff4d4d";
                erro.innerText = "Credenciais inválidas!";
                
                const container = document.querySelector('.login-container');
                container.style.animation = 'none';
                container.offsetHeight; 
                container.style.animation = 'shake 0.4s';
            }
        }