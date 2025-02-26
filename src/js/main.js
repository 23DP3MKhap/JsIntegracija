document.getElementById("fetchData").addEventListener("click", async function () {
    const playerId = document.getElementById("playerId").value.trim();
    const resultDiv = document.getElementById("result");

    if (!playerId) {
        resultDiv.innerHTML = "Ievadiet spēlētāja ID";
        return;
    }

    resultDiv.innerHTML = "Notiek datu ielāde...";

    try {
        const response = await fetch(`https://api.opendota.com/api/players/${playerId}`);

        const data = await response.json();

        const matchesResponse = await fetch(`https://api.opendota.com/api/players/${playerId}/wl`);
        const matchesData = await matchesResponse.json();

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