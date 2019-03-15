#! /bin/bash

echo ">>> Bootstraping Users!"

sleep 5
/opt/jboss/keycloak/bin/kcadm.sh config credentials --server http://localhost:8080/auth --realm master --user admin --password admin
/opt/jboss/keycloak/bin/kcadm.sh create users -r Test -s enabled=true -s username=luke -s email="luke@skywalker.com" -s emailVerified=true -s firstName=Luke -s lastName=Skywalker
/opt/jboss/keycloak/bin/kcadm.sh set-password -r Test --username luke -p luke

echo ">>> Users bootstrapped!"
