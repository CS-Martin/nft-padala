export interface EtherscanTransaction {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    nonce: string;
    blockHash: string;
    transactionIndex: string;
    from: string;
    to: string;
    value: string;
    gas: string;
    gasPrice: string;
    isError: string;
    txreceipt_status: string;
    input: string;
    contractAddress: string;
    cumulativeGasUsed: string;
    gasUsed: string;
    confirmations: string;
    methodId: string;
    functionName: string;
}

export class SepoliaEtherscanService {
    private readonly API_KEY = 'FTPIYFYVYV3YDDAPF5Q3S579KXH6J3RIBQ';
    private readonly BASE_URL = 'https://api-sepolia.etherscan.io/api';
    private readonly contractAddress: string;

    constructor(contractAddress: string) {
        this.contractAddress = contractAddress;
    }

    async getAllTransactions(): Promise<EtherscanTransaction[]> {
        const url = `${this.BASE_URL}?module=account&action=txlist&address=${this.contractAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${this.API_KEY}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data = await response.json();

            if (data.status !== '1') {
                throw new Error(`Etherscan error: ${data.message}`);
            }

            return data.result as EtherscanTransaction[];
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw error;
        }
    }

    async getTransactionsByWallet(walletAddress: string): Promise<EtherscanTransaction[]> {
        const allTx = await this.getAllTransactions();
        const wallet = walletAddress.toLowerCase();
        return allTx.filter((tx) => tx.from.toLowerCase() === wallet || tx.to.toLowerCase() === wallet);
    }
}
