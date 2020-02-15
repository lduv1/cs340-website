const ratingsData = [
    { ID: 2, userID: 1, buildOrPart: true, rating: 4, comment: "Pretty good"},
    { ID: 1, userID: 2, buildOrPart: true, rating: 4, comment: "Pretty good"},
    { ID: 1, userID: 1, buildOrPart: false, rating: 3, comment: "Eh"},
    { ID: 4, userID: 4, buildOrPart: true, rating: 5, comment: "Amazing"},
    { ID: 5, userID: 5, buildOrPart: false, rating: 5, comment: "Perfect product"}
]

const partsData = [
    { ID: 1, partType: 1, price: 12, specs: "tech specs go here"},
    { ID: 2, partType: 1, price: 12, specs: "tech specs go here"},
    { ID: 6, partType: 4, price: 3, specs:  "tech specs go here"},
    { ID: 5, partType: 8, price: 15, specs: "tech specs go here"},
    { ID: 8, partType: 1, price: 12, specs: "tech specs go here"},
    { ID: 3, partType: 3, price: 16, specs: "tech specs go here"},
    { ID: 7, partType: 2, price: 12, specs: "tech specs go here"},
    { ID: 4, partType: 1, price: 7, specs:  "tech specs go here"},
    { ID: 10, partType: 3, price: 5, specs: "tech specs go here"},
    { ID: 15, partType: 3, price: 5, specs: "tech specs go here"},
    { ID: 14, partType: 3, price: 5, specs: "tech specs go here"},
    { ID: 13, partType: 3, price: 5, specs: "tech specs go here"},
    { ID: 12, partType: 3, price: 5, specs: "tech specs go here"},
    { ID: 11, partType: 3, price: 5, specs: "tech specs go here"},
    { ID: 9, partType: 1, price: 12, specs: "tech specs go here"}
]

const buildsData = [
    {ID: 2, userID: 1, partsList: "click to view"},
    {ID: 6, userID: 2, partsList: "click to view"},
    {ID: 1, userID: 1, partsList: "click to view"},
    {ID: 5, userID: 5, partsList: "click to view"},
    {ID: 3, userID: 2, partsList: "click to view"},
    {ID: 4, userID: 1, partsList: "click to view"}
]

const usersData = [
    {ID: 1, email: "a@b.com", password: "1234", firstName: "first", lastName: "last", },
    {ID: 2, email: "aa@bb.com", password: "12345", firstName: "greg", lastName: "smith", },
    {ID: 3, email: "test@testing.com", password: "54321", firstName: "ella", lastName: "stella", },
    {ID: 5, email: "ayy@lmao.com", password: "abc", firstName: "stella", lastName: "ella", },
    {ID: 6, email: "g@mail.com", password: "abc123", firstName: "tom", lastName: "francer", },
    {ID: 4, email: "davisb@oregonstate.edu", password: "password", firstName: "bob", lastName: "davis", }
]

export { ratingsData, partsData, buildsData, usersData};