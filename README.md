# Dev Plus System
Dev Plus System is a system developed by Dev Plus, used to manage daily activities of organization. The system includes functions of recruitment, staff management, projects management, documents management.

## Techniques
- [NodeJs - v14](https://nodejs.org/en/docs/)
- [ReactJs - v17](https://reactjs.org/docs/getting-started.html)
- [Redux Saga](https://redux-saga.js.org/docs/introduction/GettingStarted)
- [Ant Design](https://ant.design/docs/react/introduce)
- [Isomorphic - Template](https://isomorphic.redq.io/dashboard)
- [Formik](https://formik.org/docs/overview)
- [React Icons](https://react-icons.github.io/react-icons/)

## Installation
### Installation dependencies

```bash
yarn install || npm install

```

### Run development

```bash
yarn start || npm run start
```

### Build Production

```bash
yarn build || npm run build
```

## Source Code Structure

## Git Contribution
### Git Branch Convention
- Branch must be matched by the following regex:
```bash
module|feat|fix|refactor|test|docs/task-name
```

- Types of specification
  - `module` Add new modules
  - `feat` Add new features
  - `fix` Fix the problem/BUG
  - `refactor` Refactor
  - `test` Test related
  - `docs` Documentation/notes

- Example:
```bash
git checkout -b feat/user-create
```

### Git Commit Message Convention
- Messages must be matched by the following regex:
```bash
module|feat|fix|refactor|test|docs(task-name): subject
```

- Example:
```bash
git commit -m "feat(user-create): make page add new user"
```

- Reference [GIT](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md)

**Developed by Ngoc Nguyen**
