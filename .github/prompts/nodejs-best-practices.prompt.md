---
applyTo: '**/*.js'
description: |
  This prompt provides general best practices for writing Node.js code.
  It ensures code quality, maintainability, and adherence to industry standards.
---
# Node.js Best Practices

## General Guidelines
- Use `async/await` for asynchronous operations instead of callbacks.
- Always handle errors using `try/catch` or `.catch()` for promises.
- Follow the Single Responsibility Principle (SRP) for functions and modules.
- Use environment variables for configuration (e.g., `dotenv` package).
- Avoid blocking the event loop with synchronous code.

## Code Style
- Use a linter like ESLint with a Node.js-specific configuration.
- Follow a consistent coding style (e.g., Prettier for formatting).
- Use `const` and `let` instead of `var`.
- Write descriptive comments for complex logic.

## Security
- Validate and sanitize user inputs to prevent injection attacks.
- Use HTTPS and secure cookies for web applications.
- Regularly update dependencies to patch vulnerabilities.
- Avoid storing sensitive data in the codebase.

## Performance
- Use a caching mechanism (e.g., Redis) for frequently accessed data.
- Optimize database queries and use indexes where applicable.
- Use clustering or load balancing for scaling applications.
- Monitor and profile your application to identify bottlenecks.

## Testing
- Write unit tests for all critical functions.
- Use integration tests to verify end-to-end functionality.
- Mock external services in tests to ensure reliability.
- Use a testing framework like Mocha, Jest, or Jasmine.

## Documentation
- Document all APIs using tools like Swagger or Postman.
- Maintain a clear and concise README for your project.
- Include examples and usage instructions for modules and functions.
