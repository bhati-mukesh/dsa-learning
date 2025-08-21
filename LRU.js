
// what is LRU?
// LRU stands for Least Recently Used, which is a cache eviction policy.
// It is used to manage a limited amount of cache space by removing the least recently used items
// when the cache reaches its limit. This ensures that frequently accessed items remain in the cache,
// while less frequently accessed items are removed to make space for new items.

// Create Node
class Node{
    constructor(key = null, value = null){
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class LRU {
    constructor(capacity){
        this.capacity = capacity;
        // to perform operations in O(1)
        this.map = new Map();
        this.head = new Node();
        this.tail = new Node();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    put(key, value){
        // check is key present
        if(this.map.has(key)){
            const node = this.map.get(key);
            node.value = value;
            this._updateToLeast(node);
        }else{
            // check is capacity is over
            if(this.map.size > this.capacity){
                // if capacity is over point to last node update the value and change the position
                this.map.delete(this.tail.prev.key);
                const node = this.tail.prev;
                node.value = value;
                node.key = key;
                this.map.set(key, node);
                this._updateToLeast(node);
            }else{
                // if capacity is under, create node and add in list
              const newNode = new Node(key, value);
              this.map.set(key, newNode);
              this.head.next.prev = newNode;
              newNode.prev = this.head;
              newNode.next = this.head.next;
              this.head.next = newNode;
            }
        }
        
    }
    
    get(key){
        if(this.map.has(key)){
            const node = this.map.get(key);
            this._updateToLeast(node);
            return node.value;
        }
        console.log(-1);
        return -1;
    }
    
    _updateToLeast(node){
        // if node is already at least position do nothing
        if(this.head.next == node){
            console.log(">> element is already on first position")
            return;
        }
        // else change poiting
        node.prev.next = node.next;
        node.next.prev = node.prev;
        this.head.next.prev = node;
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next = node;
    }
    
    print(){
        let node = this.head.next;
        while(true){
            console.log(node.value);
            // due to empty tail node
            if(node.next.next == null){
                break;
            }
            node = node.next;
        }
    }
    
}

const lru = new LRU(3);
lru.put(2,2);
lru.put(3,3);
lru.put(4,4);
// lru.put(5,5);
// lru.put(6,6);
// lru.put(7,7);
lru.print();
lru.get(4);
lru.put(3,10)
// lru.get(5);
// lru.get(10);
lru.print();

