package kr.or.connect.todo.service;

import java.sql.Date;
import java.util.Arrays;
import java.util.Collection;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.connect.domain.Todo;
import kr.or.connect.todo.persistence.TodoDao;

@Service
public class TodoService {
	// private ConcurrentMap<Integer, Todo> repo = new ConcurrentHashMap<>();
	// private AtomicInteger maxId = new AtomicInteger(0);
	//

	private final TodoDao dao;
//BookDao dao = 
	@Autowired
	public TodoService(TodoDao dao) {
		this.dao = context.getBean(TodoDao.class);
	}
	
	
	
	

	public Collection<Todo> findAll() {
		return dao.selectAll();
	}

	public Todo findById(Integer id) {
		return dao.selectById(id);
	}

	public Todo create(Todo todo) {
		Integer id = dao.insert(todo);
		todo.setId(id);
		return todo;
	}

	public boolean update(Todo todo) {
		int affected = dao.update(todo);
		return affected == 1;
	}

	public boolean delete(Integer id) {
		int affected = dao.deleteById(id);
		return affected == 1;
	}

	//

}
