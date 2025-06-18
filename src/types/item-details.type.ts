export type ItemDetailsResponse = {
    result: {
        s_itemName: string;
        s_locationOrigin: string;
        s_finalRecipient: string;
        s_itemIdentifier: string;
    };
    status: 'success' | 'error'; // You can expand this if other statuses are possible
};
