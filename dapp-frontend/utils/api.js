// 코인 정보 받아오기 https://api.coingecko.com/api/v3/simple/price?ids=klay-token&vs_currencies=krw
// https://api.coingecko.com/api/v3/simple/price?ids=klay-token&vs_currencies=krw
const BASE_URL = "https://api.coingecko.com/api/v3/simple";

export const coinsApi = {
    getKlayPriceKrw: () =>
        fetch(`${BASE_URL}/price?ids=klay-token&vs_currencies=krw`).then(
            (res) => res.json()
        ),
};
