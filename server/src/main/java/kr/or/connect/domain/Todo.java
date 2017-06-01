package kr.or.connect.domain;

import java.sql.Date;

public class Todo {
	private Integer id;
	private String todo;
	private boolean completed;
	private Date date;

	public Todo()
	{}
	
	public Todo(String todo) {
		this.todo = todo;
	}

	public Todo(Integer id, String todo, boolean completed, Date date) {
		this.id = id;
		this.todo = todo;
		this.completed = completed;
		this.date = date;
	}

	public Integer getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTodo() {
		return todo;
	}

	public void setTodo(String todo) {
		this.todo = todo;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

}
