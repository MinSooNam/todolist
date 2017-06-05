(function(window) {
    'use strict';
    // Your starting point. Enjoy the ride!

    const IS_COMPLETED = true;
    const TYPE_ALL = 'all';
    const TYPE_ACTIVE = 'active';
    const TYPE_COMPLETED = 'completed'

    var $todoList = $('.todo-list');
    var $todoCount = $('.todo-count');

    /*
        register events
    */
    $(function() {
        setTodoList(TYPE_ALL);
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

    $('.main').on('click', '.toggle', function() {
        var $toggle = $(this);
        var id = this.value;
        var completed = this.checked;

        var todoData = {
            'id': id,
            'completed': completed
        };

        updateTodo(todoData, $toggle);
    });

    $('.main').on('click', '.destroy', function() {
        var id = $(this).parents('li').children('div').children('input').val();
        var liIndex = $(this).parents('li').index();

        deleteTodo(id, liIndex);
    });

    $('.footer').on('click', '.clear-completed', function() {
        deleteCompleted();
    });

    $('.filters li').on('click', function(event) {
        setTodoList(event.target.id);
        event.stopPropagation();
    });


    /*
        Jquery ajax functions
    */

    function setTodoList(type) {
        $.ajax({
            method: 'GET',
            url: '/api/todos',
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
                var str = '';
                var count = 0;

                $todoList.empty();
                for (var i in data) {
                    if (type == TYPE_ALL) {
                        str += getHtmlLi(data[i]);
                        if (data[i].completed != IS_COMPLETED) {
                            count++
                        };
                    } else if (type == TYPE_ACTIVE && data[i].completed != IS_COMPLETED) {
                        str += getHtmlLi(data[i]);
                        count++;
                    } else if (type == TYPE_COMPLETED && data[i].completed == IS_COMPLETED) {
                        str += getHtmlLi(data[i]);
                        //count++;
                    }
                }
                $todoList.append(str);

                setTodoCount(count);
            },
            error: function() {
                alert('failed get todo list');
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
            success: function(newTodoData) {
                $todoList.prepend(getHtmlLi(newTodoData));

                var count = $todoCount.html().split(' ');
                setTodoCount(++count[0])
            },
            error: function() {
                alert('failed add todo');
            }
        });
    }

    function updateTodo(todoData, $toggle) {
        $.ajax({
            method: 'PUT',
            url: '/api/todos/' + todoData.id,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(todoData),
            success: function(data) {
                var count = $todoCount.html().split(' ');

                if (todoData.completed) {
                    $toggle.parents('li').addClass('completed');
                    setTodoCount(--count[0])
                } else if (!todoData.completed) {
                    $toggle.parents('li').removeClass('completed');
                    setTodoCount(++count[0])
                }
            },
            error: function() {
                if (todoData.completed) {
                    $toggle.prop('checked', false);
                } else if (!todoData.completed) {
                    $toggle.prop('checked', true);
                }
                alert('failed update todo');
            }
        });
    }

    function deleteTodo(id, liIndex) {
        $.ajax({
            method: 'DELETE',
            url: '/api/todos/' + id,
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
                $todoList.children('li').eq(liIndex).remove()

                var count = $todoCount.html().split(' ');
                setTodoCount(--count[0])
            },
            error: function() {
                alert('failed delete todo');
            }
        });
    }

    function deleteCompleted() {
        $.ajax({
            method: 'DELETE',
            url: '/api/todos/completed/',
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
                var completedList = $todoList.children('li.completed')

                completedList.remove();

                var count = $todoCount.html().split(' ');
                setTodoCount(count[0] - completedList.length)
            },
            error: function() {
                alert('failed clear-completed');
            }
        });
    }


    /*
      Helper functions
    */
    function getHtmlLi(data) {
        return `<li ` + (data.completed == IS_COMPLETED ? `class="completed">` : `>`) +
            `<div class="view">` +
            `<input class="toggle" type="checkbox"` + (data.completed == IS_COMPLETED ? ` checked` : ``) + ` value="` + data.id + `">` +
            `<label>` + data.todo + `</label>` +
            `<button class="destroy"></button>` +
            `</div>` +
            `</li>`
    }

    function setTodoCount(count) {
        count = (count < 0 ? 0 : count);
        $todoCount.html(count + ' item left');
    }

})(window);
