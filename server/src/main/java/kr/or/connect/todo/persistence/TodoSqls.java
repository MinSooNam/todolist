package kr.or.connect.todo.persistence;

public class TodoSqls {
	public static final String DELETE_BY_ID = "DELETE FROM TODO WHERE id= :id";

	public static final String SELECT_ALL = "SELECT * FROM TODO";

	public static final String COUNT_BOOK = "SELECT COUNT(*) FROM TODO";
	
	
	
	public static final String SELECT_BY_ID = "SELECT * FROM TODO WHERE id= :id";
	
	
	public  static final String UPDATE =
			"UPDATE TODO SET\n"
			//+ "todo = :title,"
			+ "completed = :completed\n"
			+ "WHERE id = :id";
	
	

}
