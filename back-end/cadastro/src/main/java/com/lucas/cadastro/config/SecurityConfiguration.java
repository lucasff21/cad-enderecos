package com.lucas.cadastro.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration implements WebMvcConfigurer{

  private final JwtAuthenticationFilter jwtAuthFilter;
  private final AuthenticationProvider authenticationProvider;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf()
        .disable()
        .authorizeHttpRequests(
        		authorizeConfig -> {
        			authorizeConfig.requestMatchers("/api/auth/register").permitAll();
        			authorizeConfig.requestMatchers("/api/auth/authenticate").permitAll();
        			authorizeConfig.requestMatchers(HttpMethod.GET, "/api/auth/enderecos").permitAll();
        			authorizeConfig.requestMatchers(HttpMethod.POST,"/api/auth/enderecos").permitAll();
        			authorizeConfig.requestMatchers(HttpMethod.PUT,"/api/auth/enderecos/{id}").permitAll();
        			authorizeConfig.requestMatchers(HttpMethod.DELETE,"/api/auth/enderecos/{id}").permitAll();
        			//authorizeConfig.requestMatchers(HttpMethod.DELETE,"/api/auth/enderecos/{id}").hasAnyAuthority("ADMIN");
        			authorizeConfig.anyRequest().authenticated();
        		}
        		)
        /*
      		.requestMatchers("/api/auth/**").permitAll()    .hasAnyAuthority("ADMIN")  
         */
        .cors()
        .and()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
  
  @Override
  public void addCorsMappings(CorsRegistry registry) {
      registry.addMapping("/**")
          .allowedOrigins("http://localhost:4200")
          .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "TRACE", "CONNECT");
  }
 
}
