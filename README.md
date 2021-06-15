# 🚀 Comencemos API Coin
Proyecto en Exprees/Sequelize

# Requerimiento
- Se requiere la base de datos, ubicada en la raiz del proyecto (db_wolox)
- Recuerda crear el archivo .env, en base al .env.default

# Instalar las dependecias del proyecto
```bash
yarn install || yarn
```

Para ejecutar el server

```bash
yarn dev
```

# Tips
- Utilizamos la dependencia node-schedule. Es la encargada de actualizar la DB. Para dejarlo corriendo se recomienda utilizar pm2 (Debido a que son muchos registros. El proceso puede demorar mas de 2 horas)
- La DB tiene datos ya insertados.

