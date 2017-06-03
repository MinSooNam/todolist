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









    $('.main').on('click', '.destroy', function() {
        //할 일 삭제
        //디비에 삭제


        alert("클릭했어요");
    });

    $('.footer').on('click', '.clear-completed', function() {
        //완료된 할 일 삭제
        //디비에 삭제

        alert("클릭했어요");
    });



    $('.main').on('click', '.toggle', function() {
        //할 일 완료/미완료를 왔다갔다거리게
        //디비 수정

        var id = this.value;
        var todo = $(this).parents('view').find('label').html;
        var completed = this.checked; //바뀔 값

        var todoData = {
            'id': id,
            'completed': completed
        };
//updateTodo(todoData);
//$(this).parents('li').addClass('completed');
        alert(todo);
    });



    $('.new-todo').on('keydown', function(event) {
        if (event.which == 13) {
            event.preventDefault();

            var todo = this.value;
            this.value = '';

            if (todo == '') {
                alert('Please fill out the todo');
                return;
            }

            var todoData = {
                'todo': todo,
                'completed': !IS_COMPLETED
            };

            addTodo(todoData);
        }
    });


    $('.filters li').on('click', function(event) {
        setTodoList(event.target.id);
        event.stopPropagation();
        //li의 색을 바꿔주는 기능까지?
    });



    function updateTodo(todoData) {
        $.ajax({
            method: 'PUT',
            url: '/api/todos/' + todoData.id,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(todoData),
            success: function(data) {
                //alert('completed add todo');

//li class 변경
$(this).parents('li').addClass('completed');

            },
            error: function() {

              //체크 원래대로..... 그냥 리스트 다시 부르까...?
                alert('failed add todo');
            }

        });
    }


    function addTodo(todoData) {
        $.ajax({
            method: 'POST',
            url: '/api/todos',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(todoData),
            success: function(data) {
                //alert('completed add todo');
                todoList.prepend(getLiString(todoData));

                var count = todoCount.html().split(' ');
                setTodoCount(++count[0])

            },
            error: function() {
                alert('failed add todo');
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
                        str += getLiString(data[i]);
                        count++;
                    } else if (type == TYPE_ACTIVE && data[i].completed != IS_COMPLETED) {
                        str += getLiString(data[i]);
                        count++;
                    } else if (type == TYPE_COMPLETED && data[i].completed == IS_COMPLETED) {
                        str += getLiString(data[i]);
                        count++;
                    }
                }
                todoList.append(str);

                setTodoCount(count);


            },
            error: function() {

            }
        });
    }

    function getLiString(data) {
        return `<li ` + (data.completed == IS_COMPLETED ? `class="completed"` : ``) + `><div class="view"><input class="toggle" type="checkbox"` + (data.completed == IS_COMPLETED ? ` checked` : ``)+` value="` +data.id+ `"><label>` + data.todo + `</label><button class="destroy"></button></div></li>`
    }

    function setTodoCount(count) {
        todoCount.html(count + ' item left');
    }


})(window);
