export function duplicatedEmailError() {
    return {
      name: 'DuplicatedEmailError',
      message: 'Existe um usuário com este email',
    };
  }