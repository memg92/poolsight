from flask.cli import AppGroup
import time
from .users import seed_users, undo_users
from .clients import seed_clients, undo_clients
from .pools import seed_pools, undo_pools
from .repairs import seed_repairs, undo_repairs
from .tasks import seed_tasks, undo_tasks

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users()
    time.sleep(0.5)
    seed_clients()
    time.sleep(0.5)
    seed_pools()
    time.sleep(0.5)
    seed_repairs()
    time.sleep(0.5)
    seed_tasks()
    # Add other seed functions here


# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
