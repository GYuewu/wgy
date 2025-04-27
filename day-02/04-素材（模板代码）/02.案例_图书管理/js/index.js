/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */

const creator = 'admin'
function getBookslist(){
    axios({

        url: 'http://hmajax.itheima.net/api/books',
        params:{
            creator
            
        }
    }).then(res=>{
        const bookList = res.data.data
        console.log(bookList);
        const htmlStr = bookList.map((item,index)=>{
            const {bookname,author,publisher} = item
            return `<tr>
          <td>${index + 1}</td>
          <td>${bookname}</td>
          <td>${author}</td>
          <td>${publisher}</td>
          <td>
            <span class="del" data-id = ${item.id}>删除</span>
            <span class="edit">编辑</span>
          </td>
        </tr>`
}).join('')
        document.querySelector('.list').innerHTML = htmlStr
})
}
getBookslist()

//add
const addModalDom = document.querySelector('.add-modal')
const  addModal = new bootstrap.Modal(addModalDom)
const add_btn = document.querySelector('.add-btn')
add_btn.addEventListener('click',e=>{
    const addForm = document.querySelector('.add-form')
    const bookObj = serialize(addForm,{hash:true ,empty:true})
    console.log(`111${bookObj}`);
    console.log(typeof(bookObj))
    axios({
        method:'POST',
        url:'http://hmajax.itheima.net/api/books',
        data:{
            ...bookObj,
            creator
        }
    }).then(res=>{
        getBookslist()

        addForm.reset()
        addModal.hide()
    })
  log(bookObj)
})

document.querySelector('.list').addEventListener('click',e=>{
    if(e.target.classList.contains('del')){
        const id = e.target.getAttribute('data-id')
        axios({
            method:'DELETE',
            url:`http://hmajax.itheima.net/api/books/${id}`
        }).then(res=>{
            getBookslist()
        })
    }
})