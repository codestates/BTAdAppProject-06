import { Button } from "@react-native-material/core";
import { useEffect, useState } from "react";
import { View, VirtualizedList } from "react-native";
import styled from "styled-components/native";
import { useWallet } from "../providers/WalletProvider";
import {
    StyleSheet,
    StatusBar,
    SafeAreaView,
    FlatList,
    Text,
} from "react-native";
import BigNumber from "bignumber.js";

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
`;

const getItem = (data, index) => {
    let t = data[index];
    //console.log(t?.updatedAt, "???");
    return {
        createdAt: t?.createdAt,
        amount: t?.amount,
        txHash: t?.creationTxHash,
        paymentId: t?.paymentId,
        updatedAt: t?.updatedAt,
        id: Math.random().toString(12).substring(0),
        title: `Item ${index + 1}`,
    };
};

const getItemCount = (data) => 8;

const ItemWrapper = styled.View`
    width: 100%;
    height: 200px;
    border-radius: 10px;
    justify-content: space-evenly;
    align-items: center;
    border-width: 1px;
    margin-bottom: 10px;
`;
const ItemRow = styled.View`
    height: 15%;
    width: 90%;
    flex-direction: row;
`;
const ItemRowHeader = styled.View`
    width: 30%;
    height: 100%;
`;
const ItemRowContent = styled.View`
    width: 70%;
    height: 100%;
`;
const ContentText = styled.Text`
    color: #070707;
    font-size: 14px;
    font-weight: bold;
`;
const Item = ({ item }) => {
    //console.log(item, "get ");

    const { web3 } = useWallet();
    const getKlay = (v) => {
        if (!v) {
            return;
        }
        v = new BigNumber(v).dividedBy(1e18);
        console.log(v.toString());
        //console.log(klay);
        return v.toString();
    };
    return (
        <ItemWrapper>
            <ItemRow>
                <ItemRowHeader>
                    <ContentText>ID</ContentText>
                </ItemRowHeader>
                <ItemRowContent>
                    <ContentText>{item.paymentId}</ContentText>
                </ItemRowContent>
            </ItemRow>
            <ItemRow>
                <ItemRowHeader>
                    <ContentText>KLAY</ContentText>
                </ItemRowHeader>
                <ItemRowContent>
                    <ContentText>{getKlay(item.amount)}</ContentText>
                </ItemRowContent>
            </ItemRow>
            <ItemRow>
                <ItemRowHeader>
                    <ContentText>생성 날짜</ContentText>
                </ItemRowHeader>
                <ItemRowContent>
                    <ContentText>{item?.createdAt}</ContentText>
                </ItemRowContent>
            </ItemRow>
            <ItemRow>
                <ItemRowHeader>
                    <ContentText>업데이트 날짜</ContentText>
                </ItemRowHeader>
                <ItemRowContent>
                    <ContentText>{item?.updatedAt}</ContentText>
                </ItemRowContent>
            </ItemRow>
            <ItemRow>
                <ItemRowHeader>
                    <ContentText>트랜잰션</ContentText>
                </ItemRowHeader>
                <ItemRowContent>
                    <ContentText>{item.txHash}</ContentText>
                </ItemRowContent>
            </ItemRow>
        </ItemWrapper>
    );
};

export default function History() {
    const { account, transaction, loadTransaction } = useWallet();
    const [refreshing, setRefreshing] = useState(false);
    const [num, setNum] = useState(8);
    const onRefresh = async () => {
        setRefreshing(true);
        loadTransaction();
        setRefreshing(false);
    };
    const loadMore = () => {
        //console.log("test");
        setNum(num + 4);
    };
    return (
        <SafeAreaView style={styles.container}>
            <Wrapper>
                <VirtualizedList
                    data={transaction}
                    initialNumToRender={8}
                    getItem={getItem}
                    getItemCount={getItemCount}
                    renderItem={({ item }) => <Item item={item} />}
                    keyExtractor={(item) => item.key}
                    //onEndReached={num}
                    //onEndReachedThreshold={loadMore}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                />
            </Wrapper>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
    item: {
        backgroundColor: "#f9c2ff",
        height: 150,
        justifyContent: "center",
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
    },
    title: {
        fontSize: 32,
    },
});
