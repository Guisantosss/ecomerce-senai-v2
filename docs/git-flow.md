# Git-flow do projeto

Git-flow é um combinado sobre para que serve cada branch (linha de trabalho).

| Branch | Para que serve | Sai de | Volta para |
|---|---|---|---|
| `main` | Versões prontas, cada uma com sua tag | | |
| `develop` | Próxima versão em construção | `main` | |
| `feature/nome` | Uma tarefa nova | `develop` | `develop` |
| `release/x.y.z` | Fechamento de um epic | `develop` | `main` e `develop` |
| `hotfix/x.y.z` | Correção urgente do que já foi lançado | `main` | `main` e `develop` |
| `gh-pages` | Cópia da `main` que o GitHub Pages mostra no site | `main` | |

Ninguém faz commit direto na `main`, na `develop` nem na `gh-pages`.

## Fazer uma tarefa

```
git switch develop
git pull
git switch -c feature/nome-da-tarefa
git add .
git commit -m "feat: descreve o que foi feito"
git push -u origin feature/nome-da-tarefa
```

No GitHub, abra um pull request (pedido para juntar o código) de `feature/nome-da-tarefa` para `develop`. O colega revisa, aprova e faz o merge.

## Fechar um epic

Troque `x.y.z` pelo número da versão.

1. Crie a branch: `git switch develop`, `git pull` e `git switch -c release/x.y.z`.
2. Atualize o número em `package.json`, `README.md` e no rodapé de `index.html`. Anote as mudanças no `CHANGELOG.md`.
3. Rode `npm test` e faça o commit.
4. Junte nas duas branches, crie a tag e publique:

```
git switch main
git merge --no-ff release/x.y.z
git tag -a vx.y.z -m "Versão x.y.z"
git switch develop
git merge --no-ff release/x.y.z
git branch -d release/x.y.z
git push origin main develop --follow-tags
git push origin main:gh-pages
```

A última linha atualiza o site. Espere de 1 a 3 minutos.

## Número da versão

O formato é `maior.menor.correção`. Cada epic sobe o número do meio: o Epic 01 é a 0.1.0, o Epic 02 é a 0.2.0, e assim por diante. Uma correção depois do lançamento sobe o último número, como 0.2.1.

## Mensagens de commit

| Início | Quando usar |
|---|---|
| `feat:` | Função nova |
| `fix:` | Correção |
| `docs:` | Documentação |
| `style:` | Visual |
| `test:` | Testes |
| `chore:` | Configuração e versão |
