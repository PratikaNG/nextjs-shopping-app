import { CartStoreActionsType, CartStoreStateType } from '@/types'
import {create} from 'zustand'
import {persist,createJSONStorage} from "zustand/middleware"

const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
    persist(
    (set)=>({
    cart:[],
    hasHydrated:false,
    addToCart: (product)=> set((state)=>{
        const exisitingItem = state.cart.findIndex(p=>
            p.id === product.id &&
            p.selectedSize === product.selectedSize &&
            p.selectedColor === product.selectedColor
        )
        if(exisitingItem !== -1){
            const updatedCart = [...state.cart]
            updatedCart[exisitingItem].quantity += product.quantity || 1;
            return {cart:updatedCart}
        }
        return {
            cart:[...state.cart,
                {...product,
                    quantity:product.quantity || 1,
                    selectedSize:product.selectedSize,
                    selectedColor:product.selectedColor}]
        }
    }),
    removeFromCart: (product)=>set((state)=>({cart:state.cart.filter((item)=>
        !(item.id === product.id &&
            item.selectedColor === product.selectedColor &&
            item.selectedSize === product.selectedSize
        ) 
    )})),
    cleartCart:()=>set({cart:[]}),
    
}),{name:"cart",storage:createJSONStorage(()=>localStorage),
    onRehydrateStorage:()=>(state)=>
    {
        if(state){
        state.hasHydrated=true
    }
    }
    })
)

export default useCartStore;





// import { CartStoreActionsType, CartStoreStateType } from '@/types'
// import {create} from 'zustand'
// import {persist,createJSONStorage} from "zustand/middleware"

// const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
//     persist(
//     (set)=>({
//     cart:[],
//     addToCart: (product)=> set((state)=>({cart:[...state.cart,product]})),
//     removeFromCart: (product)=>set((state)=>({cart:state.cart.filter((item)=>item.id !== product.id)})),
//     cleartCart:()=>set({cart:[]})
// }),{name:"cart",storage:createJSONStorage(()=>localStorage)})
// )

// export default useCartStore;
