import { nonNull, objectType } from "nexus";
import { Review } from "./review";


export const Reviewer = objectType({
    name: "Reviewer",
    definition(t){
        t.nonNull.id("id"),
        t.nonNull.string("name"),
        t.nonNull.string("email"),
        t.nonNull.list.field('reviews',{
            type: nonNull(Review),
            async resolve(parent,_args,{db}) : Promise<any>{
                if(!parent.id){
                    throw new Error('Id not provided')
                }
                const reviewer = await db.reviewer.findUnique({
                    where: {
                        id: parent.id
                    },
                    include: {
                        reviews: true
                }})
                return reviewer!.reviews
            }
        })
    }
})