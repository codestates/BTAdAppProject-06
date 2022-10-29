// 코인 정보 받아오기 https://api.coingecko.com/api/v3/simple/price?ids=klay-token&vs_currencies=krw
// https://api.coingecko.com/api/v3/simple/price?ids=klay-token&vs_currencies=krw
const BASE_URL = "https://api.coingecko.com/api/v3/simple";
const TRAN_BASE_URL = "http://34.64.123.78:4500/payments";

export const coinsApi = {
    getKlayPriceKrw: () =>
        fetch(`${BASE_URL}/price?ids=klay-token&vs_currencies=krw`).then(
            (res) => res.json()
        ),
    getAdressTransaction: (address) =>
        fetch(`${TRAN_BASE_URL}/${address}`)
            .then(
                (res) => res.json()
                //console.log(address, "geget");
            )
            .catch((err) => console.err(err)),
};
