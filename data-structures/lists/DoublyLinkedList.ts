import DoubleListNode from './DoubleListNode'
import List from './ListInterface'

export default class DoublyLinkedList implements List{
    private head: DoubleListNode | null
    private tail: DoubleListNode | null
    private size: number

    public constructor(){
        this.head = null
        this.tail = null
        this.size = 0
    }

    public addToFrontOfList = (value: number): void => {
        const node: DoubleListNode = new DoubleListNode(value)

        if(this.size === 0){
            this.head = node
            this.tail = node
            this.size++
        }
        else if(this.size === 1){
            this.head = node
            this.head.next = this.tail
            this.tail.prev = this.head
            this.size++
        }
        else{
             node.next = this.head
             this.head.prev = node
             this.head = node
             this.size++
        }
    }

    public addToBackOfList = (value: number ): void => {

        const node: DoubleListNode = new DoubleListNode(value)

        if(this.size===0){
            this.head = node
            this.tail = node
            this.size++
        }
        else if(this.size === 1){
            this.head.next = node
            this.tail = node
            this.tail.prev = this.head
            this.size++
        }
        else{
            this.tail.next = node
            node.prev = this.tail
            this.tail = node 
            this.size ++
        }
    }

    public removeFirstNode = (): DoubleListNode => {
        if(this.size === 0){
            throw new Error("Can not remove first node, list is currently empty")
        }
        else if(this.size === 1){
            const node: DoubleListNode = this.head

            this.head = null
            this.tail = null
            this.size--

            return node
        }
        else{
            const node: DoubleListNode = this.head 

            this.head = this.head.next
            this.head.prev = null
            this.size--
    
            return node
        }
    }

    public removeLastNode = (): DoubleListNode => {

        if(this.size === 0){
            throw new Error("Can not remove last node, list is currently empty")
        }
        else if(this.size === 1){
            const node: DoubleListNode = this.head

            this.head = null
            this.tail = null
            this.size --

            return node
        }
        else {
            const node: DoubleListNode = this.tail 

            this.tail = this.tail.prev
            this.tail.next = null
            this.size--
    
            return node
        }
    }

    public getFirstNode = (): DoubleListNode => {
        return this.head
    }

    public getLastNode = (): DoubleListNode => {
        return this.tail
    }

    public getNodeAtIndex = (index: number): DoubleListNode => {
        this.validateNumberParam(index)

        if(index === 0){
            return this.head
        }
        else if(index === this.size - 1){
            return this.tail
        }
        else{
            let node: DoubleListNode = this.head

            for(let i = 0;i < index;i++){
                node = node.next
            }
            
            return node
        }
    }

    public removeNodeAtIndex = (index: number): DoubleListNode => {

        this.validateNumberParam(index)

        if(index === 0){
            this.removeFirstNode()
        }
        else if(index === this.size - 1){
            this.removeLastNode()
        }
        else{
            let node: DoubleListNode = this.head
            
            for(let i = 0; i<index;i++){

                node = node.next
            }

            let prev: DoubleListNode = node.prev
            let next: DoubleListNode = node.next

            prev.next = next 
            next.prev = prev
            this.size --
            
            return node
        }
    }

    //debug tool, won't be tested
    public printList = (): void => {
        let node: DoubleListNode = this.head

        while(node !== null){
            console.log(node.value)
            console.log(node.next)
            node = node.next
        }
    }

    public insertNodeAtIndex = (index: number, value: number): void => {

        this.validateNumberParam(index)

        if(index === 0){
            this.addToFrontOfList(value)
        }
        else if(index === this.size){
            console.log('went to the back')
            this.addToBackOfList(value)
        }
        else{
            const newNode: DoubleListNode = new DoubleListNode(value)
            let node: DoubleListNode = this.head

            for(let i = 0;i < index;i++){
                node = node.next
            }

            newNode.prev = node.prev
            node.prev.next = newNode
            newNode.next = node
            node.prev = newNode
            this.size++
        }
    }

    public getSize = (): number => {
        return this.size
    }

    private validateNumberParam = (number: number): void => {
        if(number < 0){
            throw new RangeError("Parameter can not be a negative number")
        }
        // value isn't a number
        else if(typeof number !== "number"){
            throw new TypeError("Parameter must be a number")
        }
        // if number is over size
        else if(number > this.size - 1 && this.size !== 0){
            // console.log(number)
            // console.log(this.size)
            throw new RangeError("value paramater exceeds list length")
        }
    }

}