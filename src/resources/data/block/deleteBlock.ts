export async function DeleteBlock(id: number) {
    console.log(`blockID: ${id}`)
    // try {
    //     const res = await fetch(`http://localhost:3000/api/v1/blocks/${id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    //             "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
    //         },
    //         credentials: 'include',
    //         cache: 'no-store',
    //     });

    //     const data = await res.json();
    //     console.log(JSON.stringify(data));
    // }
    // catch (error: any) {
    //     throw new Error(error);
    // }
};