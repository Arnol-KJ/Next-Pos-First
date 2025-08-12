import EditPage from "@/app/frontEnd/EditPage";


export default async function ProductPage({params}: {params: {storeId: string, productId: string}}) {
    const {storeId, productId} = params;

    return (
        <div>
            <EditPage storeId={storeId} productId={productId} />
        </div>
    );
}

