# 1. Use the Iron Bank Neo4j 4.4.12 base image
FROM registry1.dso.mil/ironbank/opensource/neo4j/neo4j:4.4.12

# 2. Set Neo4j credentials
ENV NEO4J_AUTH=neo4j/testMe1234!

# (Optional) If you want APOC automatically:
# ENV NEO4JLABS_PLUGINS='["apoc"]'

# 3. Expose ports (only documents them; no volumes used)
EXPOSE 7474
EXPOSE 7687

# 4. Copy your existing "volume" directories into the container
#    (Adjust paths as needed based on your local project structure)
USER root
COPY plugins /plugins
COPY data /var/lib/neo4j/data
COPY conf /var/lib/neo4j/conf
COPY import /import
COPY logs /logs

# 5. Ensure correct ownership for the neo4j user
RUN chown -R neo4j:neo4j /var/lib/neo4j /plugins /import /logs /var/lib/neo4j/conf

RUN chgrp -R 0 /var/lib/neo4j/conf && \
    chmod -R g=u /var/lib/neo4j/conf 

# 6. Switch back to the neo4j user for security
USER neo4j

# 7. Default command to start Neo4j
CMD ["neo4j"]
