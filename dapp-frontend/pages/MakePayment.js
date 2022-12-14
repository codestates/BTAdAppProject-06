import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import styled from "styled-components/native";
import PageHeader from "../components/PageHeader";
import PageContent from "../components/PageContent";
import PageFooter from "../components/PageFooter";
import PageTitle from "../components/PageTitle";
import PageWrapper from "../components/PageWrapper";
import Row from "../components/Row";
import CustomButton from "../components/CustomButton";
import { useWallet } from "../providers/WalletProvider";
import { ListItem } from "@react-native-material/core";
import getPayContract from "../utils/getPayContract";

const NormalText = styled.Text`
    font-size: 24px;
`;

const NormarContnetText = styled.Text`
    font-size: 18px;
`;

const TableRow = styled(Row)`
    margin-bottom: 24px;
    padding-top: 20px;
`;

export default function MakePayment({ route, navigation }) {
    const { uuid, klayPrice, date } = route.params;
    const { account, web3, klayToKrw, noti } = useWallet();
    const [fee, setFee] = useState();
    const value = web3.utils.toWei(klayPrice.toString(), "ether");
    const pay = () => {
        //console.log(value);
        const contract = getPayContract(web3);
        contract.methods
            .makePayment(uuid)
            .estimateGas({
                from: account,
                value: value,
            })
            .then((gas) => {
                //console.log(gas);
                contract.methods
                    .makePayment(uuid)
                    .send({
                        from: account,
                        value: value,
                        gas: gas,
                    })
                    .then((receipt) => {
                        console.log(receipt);
                        //console.log("success");
                        navigation.push("SendModal", {
                            klay: klayPrice,
                            receipt: receipt,
                            sendAddress: account,
                            receiver: uuid,
                            fee: fee,
                        });
                    })
                    .then((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
                console.log("failed");
            });
    };
    useEffect(() => {
        const contract = getPayContract(web3);
        contract.methods
            .makePayment(uuid)
            .estimateGas({
                from: account,
                value: value,
            })
            .then((gas) => {
                console.log(gas);
                const getFee = web3.utils.fromWei(
                    web3.utils.toBN("50000000000").mul(web3.utils.toBN(gas)),
                    "ether"
                );
                setFee(getFee);
                //console.log(getFee);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <PageWrapper>
            <PageHeader>
                <PageTitle>?????? ??????</PageTitle>
            </PageHeader>
            <PageContent>
                <TableRow>
                    <NormalText>?????? ID</NormalText>
                    <NormarContnetText>{uuid}</NormarContnetText>
                </TableRow>
                <TableRow>
                    <NormalText>??????</NormalText>
                    <NormarContnetText>
                        {"???  " + Math.ceil(klayPrice * klayToKrw) + "???"}
                    </NormarContnetText>
                </TableRow>
                <TableRow>
                    <NormalText>?????? ??????</NormalText>
                    <NormarContnetText>{date}</NormarContnetText>
                </TableRow>
                <TableRow>
                    <NormalText>?????? ????????? </NormalText>
                    <NormarContnetText>{fee} KLAY</NormarContnetText>
                </TableRow>

                <TableRow>
                    <NormalText>?????? ??????</NormalText>
                    <NormarContnetText>{klayPrice} KLAY</NormarContnetText>
                </TableRow>
            </PageContent>
            <PageFooter>
                <CustomButton onPress={() => pay()}>????????????</CustomButton>
            </PageFooter>
        </PageWrapper>
    );
}
