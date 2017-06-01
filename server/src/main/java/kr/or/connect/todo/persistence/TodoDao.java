package kr.or.connect.todo.persistence;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import kr.or.connect.domain.Todo;

@Repository
public class TodoDao {
	private NamedParameterJdbcTemplate jdbc;
	private SimpleJdbcInsert insertAction;

	private RowMapper<Todo> rowMapper = BeanPropertyRowMapper.newInstance(Todo.class);

	public TodoDao(DataSource dataSource) {
		this.jdbc = new NamedParameterJdbcTemplate(dataSource);
		this.insertAction = new SimpleJdbcInsert(dataSource).withTableName("TODO").usingGeneratedKeyColumns("id")
				.usingColumns("todo");
	}

	// 패키지는 kr.or.connect.todo.persistence로 선언한다.
	// Spring JDBC의 SimpleJdbcInsert, NamedParameterJdbcTemplate을 이용해서 구현한다.
	// CRUD 동작을 실행하는 역할에만 충실하도록 구현한다.
	// SQL구문은 TodoSqls 클래스에 상수로 선언한다.

	public List<Todo> selectAll() {
		Map<String, Object> params = Collections.emptyMap();
		return jdbc.query(TodoSqls.SELECT_ALL, params, rowMapper);
	}

	public Todo selectById(Integer id) {
		Map<String, Object> params = Collections.singletonMap("id", id);
		return jdbc.queryForObject(TodoSqls.SELECT_BY_ID, params, rowMapper);
	}

	public Integer insert(Todo todo) {
		SqlParameterSource params = new BeanPropertySqlParameterSource(todo);
		return insertAction.executeAndReturnKey(params).intValue();

	}

	public Integer update(Todo todo) {

		SqlParameterSource params = new BeanPropertySqlParameterSource(todo);
		return jdbc.update(TodoSqls.UPDATE, params);
	}

	public Integer deleteById(Integer id) {
		Map<String, ?> params = Collections.singletonMap("id", id);
		return jdbc.update(TodoSqls.DELETE_BY_ID, params);
	}

}
