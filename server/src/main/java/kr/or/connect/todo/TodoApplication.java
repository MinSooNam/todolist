package kr.or.connect.todo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class TodoApplication extends WebMvcConfigurerAdapter {
	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
		System.out.println("app start");
		
		ConfigurableApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
	}

}
