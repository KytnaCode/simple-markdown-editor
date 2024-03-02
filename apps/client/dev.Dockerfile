FROM node:20-alpine3.19 as base
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

FROM base as builder

COPY . .

RUN npm install --global pnpm \
  && pnpm add --global turbo \
  && turbo prune --scope=client --docker

FROM base as runner

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 reactjs

COPY --from=builder --chown=reactjs:nodejs \
  /app/out/json/ \
  /app/out/pnpm-lock.yaml \
  /app/out/pnpm-workspace.yaml \
  ./

RUN npm install --global pnpm 

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN chown -R reactjs:nodejs /app \
  && chmod +rwx /app

COPY --from=builder --chown=reactjs:nodejs /app/out/full .

CMD [ "pnpm", "run", "turbo", "run", "dev:docker" ]
