package kr.or.connect.todo.persistence;

public class TodoSqls {
	public static final String SELECT_ALL = "SELECT * FROM TODO ORDER BY date DESC";	
	public static final String SELECT_BY_ID = "SELECT * FROM TODO WHERE id= :id  ORDER BY date DESC";
	public static final String SELECT_BY_COMPLETED = "SELECT * FROM TODO WHERE completed= :completed  ORDER BY date DESC";
	
	public static final String UPDATE =
			"UPDATE TODO SET\n"
			+ "completed = :completed\n"
			+ "WHERE id = :id";
	public static final String DELETE_BY_ID = "DELETE FROM TODO WHERE id= :id";
	public static final String DELETE_BY_COMPLETED = "DELETE FROM TODO WHERE completed= true";
}
