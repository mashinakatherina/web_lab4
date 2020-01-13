package ifmo.pip.lab4.service;

import ifmo.pip.lab4.model.data.User;

public interface UserService {
    User save(User user);

    User findByUsername(String username);
}
