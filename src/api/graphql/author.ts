import { extendType, idArg, nonNull, objectType, stringArg } from "nexus";
import { Book } from "./book";

export const Author = objectType({
    name: "Author",
    definition(t){
        t.nonNull.id("id"),
        t.nonNull.string("name"),
        t.nonNull.list.field('books',{
            type: Book,
            async resolve(parent,_args,{db}){
                if(!parent.id){
                    throw new Error('Id not provided')
                }
                const author = await db.author.findUnique({
                    where: {
                        id: parent.id
                    },
                    include: {
                        books: true
                    }
                })
                return author!.books
            }
        })
    }
})

export const AuthorQuery = extendType({
    type: "Query",
    definition(t){
        t.nonNull.list.field("authors",{
            type: nonNull(Author),
            resolve(_parent,_args,{db}){
                return db.author.findMany()
            }
        }),
        t.nonNull.field("author",{
            type: nonNull(Author),
            args: {
                id: nonNull(idArg())
            },
            async resolve(_parent,args: {id: string},{db}){
                const author = await db.author.findUnique({
                    where: {
                        id: args.id
                    },
                    include: {
                        books: true
                    }
                })
                if(!author){
                    throw new Error('Author not found.')
                }
                return author
            }
        }),
        t.nonNull.list.field('searchAuthors',{
            type: nonNull(Author),
            args: {
                name: nonNull(stringArg())
            },
            resolve(_parent,args,{db}){
                if(!args.name){
                    return db.author.findMany();
                }else{
                    return db.author.findMany({
                        where: { 
                            name: {
                                contains: args.name
                            }
                        }
                    })
                }
            }
        })
    }
})