(function(window) {
    'use strict';

    // Your starting point. Enjoy the ride!
    const IS_COMPLETED = true;
    const TYPE_ALL = 'all';
    const TYPE_ACTIVE = 'active';
    const TYPE_COMPLETED = 'completed'
    var todoList = $('.todo-list');
    var todoCount = $('.todo-count');


    $(function() {
        setTodoList(TYPE_ALL);


    });






    $('.new-todo').on('keydown', function(event) {
        if (event.which == 13) {
            event.preventDefault();

            var todo = this.value;
            //새로 추가

            if (todo == '') {
                alert('Please fill out the todo');
									return;
            }

						            //alert('nonononono');

            var todoData = JSON.stringify({
                'todo': todo
            });
            addTodo(todoData);

        }
    });


    $('.main').on('click', '.toggle', function() {
        //할 일 완료/미완료를 왔다갔다거리게
        //디비 수정

        alert("클릭했어요");
    });


    $('.main').on('click', '.destroy', function() {
        //할 일 삭제
        //디비에 삭제


        alert("클릭했어요");
    });

    $('.footer').on('click', '.clear-completed', function() {
        //할 일 삭제
        //디비에 삭제


        alert("클릭했어요");
    });




    $('.filters li').on('click', function(event) {
        setTodoList(event.target.id);
        event.stopPropagation();
        //li의 색을 바꿔주는 기능까지?
    });




    function addTodo(todoData) {
        $.ajax({
            method: 'POST',
            url: '/api/todos',
            contentType: 'application/json',
            dataType: 'json',
            data: todoData,
            success: function(data) {
                alert('성공');
            },
            error: function() {
                alert('실패');
            }

        });
    }


    function setTodoList(type) {
        $.ajax({
            method: 'GET',
            url: '/api/todos',
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
                var str = '';
                var count = 0;

                todoList.empty();
                for (var i in data) {
                    if (type == TYPE_ALL) {
                        str += appendStr();
                        count++;
                    } else if (type == TYPE_ACTIVE && data[i].completed != IS_COMPLETED) {
                        str += appendStr(str);
                        count++;
                    } else if (type == TYPE_COMPLETED && data[i].completed == IS_COMPLETED) {
                        str += appendStr(str);
                        count++;
                    }
                }
                todoList.append(str);

                setTodoCount(count);

                function appendStr() {
                    return `<li ` + (data[i].completed == IS_COMPLETED ? `class="completed"` : ``) + `><div class="view"><input class="toggle" type="checkbox"` + (data[i].completed == IS_COMPLETED ? `checked` : ``) + ` ><label>` + data[i].todo + `</label><button class="destroy"></button></div></li>`
                }
            },
            error: function() {

            }
        });
    }

    function setTodoCount(count) {
        todoCount.html(count + ' item left');
    }


})(window);
