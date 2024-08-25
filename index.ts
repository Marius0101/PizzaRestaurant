type Order = {
    id: number;
    pizza: Pizza;
    status: "ordered" | "completed";
};

type Pizza = {
    id: number
    name: string
    price: number
};
let nextPizzaId= 1
let menu: Pizza[] = [
    { id: nextPizzaId++, name: "Margherita", price: 8 },
    { id: nextPizzaId++, name: "Pepperoni", price: 10 },
    { id: nextPizzaId++, name: "Hawaiian", price: 10 },
    { id: nextPizzaId++, name: "Veggi", price: 9 },
]

let cashInRegister = 100
let orderHistory: Order[] = [];
let nextOrderId= 1

type AddPizza = Omit<Pizza, "id">
function addNewPizza(pizzaObj: AddPizza): Pizza {
    const newPizza: Pizza = {
        id: nextPizzaId++,
        name: pizzaObj.name,
        price: pizzaObj.price
    }
    menu.push(newPizza)
    return newPizza
}

function placeOrder(OrderPizzaName: string): Order | undefined {
    const selctedPizza =  menu.find( pizza => pizza.name === OrderPizzaName)
    if( !selctedPizza ){
        console.error(`${OrderPizzaName} does not exist in the menu`)
        return
    }
    cashInRegister += selctedPizza.price
    const newOrder:  Order = {id:nextOrderId++, pizza: selctedPizza , status: "ordered" }
    orderHistory.push(newOrder)
    return newOrder
}

function completeOrder(orderId: number): Order | undefined {
    let completOrder = orderHistory.find( order => order.id === orderId)
    if( !completOrder ){
        console.error(`${orderId} does not exist in the order queue`)
        return
    }
    completOrder.status = "completed"
    return completOrder
}

export function getPizzaDetail(identifier: string | number ): Pizza | undefined   {
    if( typeof(identifier) == "number" ){
        return menu.find( pizza  => pizza.id === identifier)
    }
    else if (typeof(identifier) === "string"){
        return menu.find( pizza  => pizza.name === identifier)
    }
    throw new TypeError ("Parameter `identifier` must be either a string or a number")
}

function addToArray<PlaceholderType>(array:PlaceholderType[], item: PlaceholderType) : PlaceholderType[] {
    array.push(item)
    return array
}

// Execution
addNewPizza({ name: "Chicke Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 11 })

placeOrder("Chicke Bacon Ranch")

completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderHistory)

console.log(getPizzaDetail(2))
console.log(getPizzaDetail("BBQ Chicken"))
console.log(getPizzaDetail("test"))
addNewPizza({name: "Chicke Bacon Ranch", price: 12 })
console.log("Menu:", menu)

addToArray<Pizza>(menu, {id:nextPizzaId++, name: "BBQ Chicken", price: 13 })
addToArray<Order>(orderHistory, {id:nextOrderId++, pizza: menu[2] , status: "ordered" })
console.log("Menu:", menu)
console.log("Order queue:", orderHistory)