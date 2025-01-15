# ec-single-sign-on

client-uuid
หาได้จาก GET /admin/realms/{realm}/clients

```
curl -k -X GET $KEYCLOAK_HOST/admin/realms/$REALM_NAME/clients \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $ACCESS_TOKEN"
```

Ref -> https://www.keycloak.org/docs-api/latest/rest-api/