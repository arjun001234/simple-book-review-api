import { createTestContext } from "./__helpers";

const ctx = createTestContext();

it('ensures that book can be created',async () => {
    const createdPost = await ctx.client.request(`
        mutation {
            createPost(title: "My First Book",isbn: "123456",price: 50.50){
                id
                title
                isbn
                price
            }
        }
    `)
    expect(createdPost).toMatchInlineSnapshot();
})