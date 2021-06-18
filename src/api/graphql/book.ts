import { extendType, idArg, inputObjectType, nonNull, objectType, stringArg } from "nexus";
import { Author } from "./author";
import { Review } from "./review";


export const BookInputType = inputObjectType({
    name: 'BookInputType',
    definition(t) {
        t.nonNull.string('title'),
        t.nonNull.string('isbn'),
        t.float('price'),
        t.nonNull.string('description')
        t.nonNull.string('authorName')
    }
})

export const Book = objectType({
    name: 'Book',
    definition(t) {
        t.nonNull.id('id'),
        t.nonNull.string('title'),
        t.nonNull.string('isbn'),
        t.nonNull.string('description'),
        t.float('price'),
        t.nonNull.list.field('authors',{ 
            type: nonNull(Author),
            async resolve(parent,_args,{db}){
                if(!parent.id){
                    throw new Error('Id not provided');
                }
                const book = await db.book.findUnique({where: {
                    id: parent.id
                },include: {
                    authors: true
                }})
                return book!.authors
            }
        }),
        t.nonNull.list.field('reviews',{
            type: nonNull(Review),
            async resolve(parent,_args,{db}) : Promise<any>{
                if(!parent.id){
                    throw new Error('Id not provided');
                }
                const book = await db.book.findUnique({where: {
                    id: parent.id
                },include: {
                    reviews: true
                }})
                return book!.reviews
            }
        })
    }
})

export const BookQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('books',{
            type: nonNull(Book),
            resolve(_parent,_args,{db}){
                return db.book.findMany();
            }
        })
        t.nonNull.field('book',{
            type: nonNull(Book),
            args: {
                id: nonNull(idArg())
            },
            async resolve(_parent,args: {id: string},{db}){
                const book = await db.book.findUnique({where: {
                    id: args.id
                },include: {
                    authors: true
                }})
                if(!book){
                    throw new Error('User not found.')
                }
                return book
            }
        })
        t.nonNull.list.field('searchBooks',{
            type: nonNull(Book),
            args: {
                title: nonNull(stringArg())
            },
            resolve(_parent,args,{db}){
                if(!args.title){
                    return db.book.findMany();
                }else{
                    return db.book.findMany({
                        where: { 
                            title: {
                                contains: args.title
                            }
                        }
                    })
                }
            }
        })
    }
})

export const BookMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createBook',{
            type: Book,
            args: {
                data: nonNull(BookInputType)
            },
            resolve(_parent,{data},ctx){
                return ctx.db.book.create({
                    data: {
                        title: data.title,
                        isbn: data.isbn,
                        description: data.description,
                        price: data.price ? data.price : null,
                        authors: {
                            create: {
                                name: data.authorName
                            }
                        }
                    },
                });
            }
        })
    }
})