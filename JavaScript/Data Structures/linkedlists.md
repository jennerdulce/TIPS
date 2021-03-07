# Singly Linked List
<!-- Short summary or background information -->
- Represents series of nodes connected by pointer.
- Each node has a value and next property
- Linear Time

## Challenge
<!-- Description of the challenge -->
- Utilize the Single-responsibility principle: any methods you write should be clean, reusable, abstract component parts to the whole challenge. You will be given feedback and marked down if you attempt to define a large, complex algorithm in one function definition

## Approach & Efficiency
<!-- What approach did you take? Why? What is the Big O space/time for this approach? -->
### Approach

#### Node
  - Create a node class
  - create the following properties as part of the constructor: value, next

#### LinkedList
  - create a linkedlist class
  - create a head property as part of the constructor

##### insert(value)
  - create a new node
  - check to see if linked list is empty
    - if empty set head to newly created node
  - if not empty:
    - save the old head
    - set the head value of the head to the new node
    - set the next value of the newly set head node, to the old node

##### includes(value)
  - check to see if linked list is empty
    - if empty return false
  - if not empty:
    - start at head of linkedList
    - create a while loop to loop through nodes
      - check to see if the value of this node matches; return true
      - continue on to the next node if the current node value does not match
    - return false if value is not matched within the whileloop

##### toString()
  - create a new string
  - start from the beginning node
  - create a while loop to loop through nodes
    - concatenate to the string with the current value node
    - continue to the next node and repeat
  - concatenate 'NULL' to the string after the while loop
    - return the string

### BIG O
- INSERT:
   - SPACE: O(1)
  - TIME: O(1)
  
 - INCLUDES:
   - SPACE: O(n)
   - TIME: O(n)

 - toString:
  - SPACE: O(n)
  - TIME: O(n)

## API
<!-- Description of each method publicly available to your Linked List -->
- `.insert()`
  - inserts a new node to the beginning of the string

- `.includes()`
  - checks to see if a node exists within the node lists

- `.toString()`
  - displays the node values


## REF
[Code Challenge](https://github.com/jennerdulce/data-structures-and-algorithms/tree/main/javascript/code-challenges/Data-Structures/linkedList)