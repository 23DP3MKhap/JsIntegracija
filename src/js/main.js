fetch("https://catfact.ninja/fact")
    .then(response => response.json())
    .then(data => {
        document.getElementById("catFact").innerText = data.fact;
    })

document.getElementById("fetchData").addEventListener("click", async function () {
    const playerId = document.getElementById("playerId").value.trim();
    const resultDiv = document.getElementById("result");

    if (!playerId) {
        resultDiv.innerHTML = "Ievadiet spēlētāja ID";
        return;
    }

    resultDiv.innerHTML = "Notiek datu ielāde...";

    try {
        const data = await (await fetch(`https://api.opendota.com/api/players/${playerId}`)).json();

        const matchesData = await (await fetch(`https://api.opendota.com/api/players/${playerId}/wl`)).json();

        const totalMatches = matchesData.win + matchesData.lose;

        const winRate = ((matchesData.win / totalMatches) * 100).toFixed(2);

        resultDiv.innerHTML = `
            <img src="${data.profile.avatarfull}" alt="Pfp" width="100">
            <p><strong>${data.profile.personaname}</strong></p>
            <p>ID: ${data.profile.account_id}</p>
            <p>Nospēlētas spēles: ${totalMatches}</p>
            <p>Uzvaras procents: ${winRate}%</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = `Error!`;
        console.error(error);
    }
});