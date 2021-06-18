import { extendType, idArg, inputObjectType, nonNull, objectType } from "nexus";
import { Book } from "./book";
import { Reviewer } from "./reviewer";


export const ReviewInputType = inputObjectType({
    name: "ReviewInputType",
    definition(t){
        t.nonNull.string('content'),
        t.nonNull.string('name'),
        t.nonNull.string('email'),
        t.nonNull.id("bookId")
    }
})

export const Review = objectType({
    name: "Review",
    definition(t){
        t.nonNull.id("id"),
        t.nonNull.string("content")
        t.nonNull.string("createdAt")
        t.nonNull.field('book',{
            type: nonNull(Book),
            async resolve(parent,_args,{db}) {
                if(!parent.id){
                    throw new Error('Id not provided')
                }
                const review = await db.review.findUnique({
                    where: {
                        id: parent.id
                    },
                    include: {
                        book: true
                }})
                return review!.book
            }
        }),
        t.nonNull.field('reviewer',{
            type: nonNull(Reviewer),
            async resolve(parent,_args,{db}) : Promise<any> {
                if(!parent.id){
                    throw new Error('Id not provided')
                }
                const review = await db.review.findUnique({
                    where: {
                        id: parent.id
                    },
                    include: {
                        reviewer: true
                }})
                return review!.reviewer
            }
        })
    }
})

export const ReviewQuery =  extendType({
    type: "Query",
    definition(t){
        t.nonNull.list.field("bookReviews",{
            type: nonNull(Review),
            args: {
                id: nonNull(idArg())
            },
            resolve(_parent,args: {id: string},{db}) : Promise<any> {
                return db.review.findMany({
                    where: {
                        bookId: args.id
                    },
                    include:{
                        reviewer: true
                    }
                })
            }
        })
    }
})

export const ReviewMuation = extendType({
    type: "Mutation",
    definition(t){
        t.nonNull.field('createReview',{
            type: nonNull(Review),
            args: {
                data: nonNull(ReviewInputType)
            },
            resolve(_parent,{data},{db}) : Promise<any>{
                const reviewer = {
                    name: data.name,
                    email: data.email,
                }
                return db.review.create({
                    data: {
                        content: data.content,
                        reviewer: {
                            create: reviewer
                        },
                        book: {
                            connect: {id: data.bookId}
                        }
                    },
                    include: {
                        reviewer: true,
                        book: true
                    }
                })
            }
        })
    }
})